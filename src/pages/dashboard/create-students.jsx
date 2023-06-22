import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState, useEffect } from "react";
import { Button, DatePicker, Form, Input, Select, message } from "antd";
import "react-phone-number-input/style.css";
import "react-phone-number-input/style.css";
import {
  collection,
  doc,
  updateDoc,
  getDocs,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { storage, db } from "../../firebase/firebaseConfig";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const validateName = (_, value) => {
  if (!value) {
    return Promise.reject("Please Input!");
  }
  return Promise.resolve();
};

export function Students() {
  const [form] = Form.useForm();
  const [classesData, setClassesData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDelete = async (id, classId) => {
    try {
      // Delete the class document from Firestore
      await deleteDoc(doc(db, "Teachers", id));
      message.success("Teacher Deleted Successfully!");

      //Update the class document in Firestore
      const classDocRef = doc(db, "Classes", classId);
      await updateDoc(classDocRef, {
        class_Name: findClassById(classId).class_Name,
        createdAt: findClassById(classId).createdAt,
        classTeacher: null,
        classTeacherId: null,
      });

      // Update the local state by removing the deleted class
      setTeachersData((prevTeachers) =>
        prevTeachers.filter((teacherItem) => teacherItem.id !== id)
      );
    } catch (error) {
      console.error("Error deleting class:", error);
      message.error("Class Deletion Failed!");
    }
  };
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Classes"));
        const classData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClassesData(classData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    const fetchTeachers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Teachers"));
        const teacherData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTeachersData(teacherData);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchTeachers();
    fetchClasses();
  }, []);

  const findClassById = (classId) => {
    return classesData.find((cls) => cls.id === classId);
  };
  const handleSubmit = async (values) => {
    try {
      // Access the form values
      const { firstName, lastName, email, phoneNumber, dateOfBirth, classId } =
        values;
      console.log(classId);
      console.log(values);
      const classDocRef = doc(db, "Classes", classId);

      const dobString = dateOfBirth.format("YYYY-MM-DD");

      const storagePath = `teacher_profile_pictures/${selectedFile.name}`;
      const uploadStorageRef = storageRef(storage, storagePath);
      await uploadBytes(uploadStorageRef, selectedFile);
      const downloadURL = await getDownloadURL(uploadStorageRef);

      // Create a new teacher document in Firestore
      const teacherData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        dateOfBirth: dobString,
        class_Name: findClassById(classId).class_Name,
        classId: classId,
        pictureURL: downloadURL,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "Teachers"), teacherData);
      console.log("Teacher created successfully with ID: ", docRef.id);
      await updateDoc(classDocRef, {
        class_Name: findClassById(classId).class_Name,
        createdAt: findClassById(classId).createdAt,
        classTeacher: `${firstName} ${lastName}`,
        classTeacherId: docRef.id,
      });
      message.success("Teacher Created Successfully!");
      const querySnapshot = await getDocs(collection(db, "Teachers"));
      const teachersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTeachersData(teachersData);
    } catch (error) {
      console.error("Error creating Teacher:", error);
      message.error(`Submit failed! ${error.message}`);
    }
    form.resetFields();
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Create Teacher
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <Form
            form={form}
            className="ml-[30px]"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                {
                  required: true,
                  validator: validateName,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  validator: validateName,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  validator: validateName,
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Date of Birth"
              name="dateOfBirth" // Make sure this matches the name used in handleSubmit
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              label="Select Class"
              name="classId"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                onChange={(value) => form.setFieldsValue({ classId: value })}
              >
                {classesData
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .map((classes) => (
                    <Select.Option key={classes.id} value={`${classes.id}`}>
                      {classes.class_Name}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              label="Profile Picture"
              name="profilePicture"
              rules={[
                {
                  required: true,
                  message: "Please upload a profile picture!",
                },
              ]}
            >
              <Input type="file" className="ml-5" onChange={handleFileChange} />
            </Form.Item>
            <Form.Item>
              <Button type="default" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </CardBody>
      </Card>

      {/* Listing All Teachers and their details */}

      <Card>
        <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            All Teachers
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {[
                  "Teacher",
                  "Class",
                  "Phone Number",
                  "Date of Birth",
                  "Email",
                  "Remove",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {teachersData
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((Teacher) => {
                  const className = "py-3 px-5 border-b border-blue-gray-50";
                  return (
                    <tr key={Teacher.id}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar
                            src={Teacher.pictureURL}
                            alt={"sdf"}
                            size="sm"
                          />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {Teacher.firstName} {Teacher.lastName}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {Teacher.class_Name}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {Teacher.phoneNumber}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {Teacher.dateOfBirth}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {Teacher.email}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography
                          as="a"
                          href="#"
                          className="text-xs font-semibold text-blue-gray-600"
                          onClick={() => {
                            handleDelete(Teacher.id, Teacher.classId);
                          }}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}

export default Students;
