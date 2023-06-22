import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import {
  collection,
  doc,
  getDocs,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Form, Input, message, Space, Spin } from "antd";
const ClassManagement = () => {
  const [classesData, setClassesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const classTeacher = null;
  const classTeacherId = null;
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Classes"));
        const classData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setClassesData(classData);
        setDataLoading(false);
      } catch (error) {
        console.error("Error fetching classes:", error);
        setDataLoading(false);
      }
    };

    fetchClasses();
  }, []);

  const [form] = Form.useForm();

  //To Add class name to firestore "Classes" collection
  const onFinish = async (e) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "Classes"), {
        class_Name: e.class_Name,
        createdAt: serverTimestamp(),
        classTeacher: classTeacher,
        classTeacherId: classTeacherId,
      });
      console.log("Class created successfully with ID: ", docRef.id);
      message.success("Class Created Successfully!");

      // Fetch the updated list of classes after adding a new class
      setDataLoading(true);
      const querySnapshot = await getDocs(collection(db, "Classes"));
      const classData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setClassesData(classData);
      setDataLoading(false);
    } catch (error) {
      console.error("Error creating class:", error);
      message.error(`Submit failed! + ${error}`);
      setDataLoading(false);
    } finally {
      setLoading(false); // Set loading state back to false
      form.resetFields();
      setDataLoading(false);
    }
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  const handleDelete = async (classId) => {
    try {
      // Delete the class document from Firestore
      await deleteDoc(doc(db, "Classes", classId));
      message.success("Class Deleted Successfully!");

      // Update the local state by removing the deleted class
      setClassesData((prevClasses) =>
        prevClasses.filter((classItem) => classItem.id !== classId)
      );
    } catch (error) {
      console.error("Error deleting class:", error);
      message.error("Class Deletion Failed!");
    }
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <div>
        <Card>
          <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Create Class
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll  ">
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                name="class_Name"
                label="Class Name"
                rules={[
                  {
                    required: true,
                  },
                  {
                    type: "string",
                    warningOnly: true,
                  },
                  {
                    type: "string",
                    min: 2,
                  },
                ]}
              >
                <Input className="w-[30%]" placeholder="Enter a Class Name" />
              </Form.Item>
              <Form.Item>
                <Space>
                  <Button type="default" htmlType="submit" loading={loading}>
                    Create Class
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </CardBody>
        </Card>

        {/* Display the list of classes */}

        {dataLoading ? (
          <div className="flex h-40 items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <Card className="mt-[70px]">
            <CardHeader variant="gradient" color="blue" className="mb-8 p-6">
              <Typography variant="h6" color="white">
                All Classes
              </Typography>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
              <table className="w-full min-w-[640px] table-auto">
                <thead>
                  <tr>
                    <th
                      key="class"
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[15px] font-bold uppercase text-blue-gray-400"
                      >
                        Class
                      </Typography>
                    </th>
                    <th
                      key="classTeacher"
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[15px] font-bold uppercase text-blue-gray-400"
                      >
                        Assigned Teacher
                      </Typography>
                    </th>
                    <th
                      key="deleteicon"
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[15px] font-bold uppercase text-blue-gray-400"
                      >
                        Remove
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {classesData
                    .sort((a, b) => b.createdAt - a.createdAt)
                    .map((classNameId) => {
                      const className =
                        "py-3 px-5 border-b border-blue-gray-50";
                      return (
                        <tr key={classNameId.id}>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {classNameId.class_Name}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography className="text-xs font-semibold text-blue-gray-600">
                              {classNameId.classTeacher
                                ? classNameId.classTeacher
                                : "Not Assigned"}
                            </Typography>
                          </td>
                          <td className={className}>
                            <Typography
                              as="a"
                              href="#"
                              className="text-xs font-semibold text-blue-gray-600"
                              onClick={() => handleDelete(classNameId.id)}
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
        )}
      </div>
    </div>
  );
};

export default ClassManagement;
