import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";

export function StatisticsCard({ title, value, icon }) {
  return (
    <Card className="h-40">
      <CardHeader
        variant="gradient"
        color="blue"
        className="absolute -mt-4 grid h-20 w-20 place-items-center"
      >
        <img src={icon} className="h-12" />
      </CardHeader>
      <CardBody className="p-5 text-right">
        <Typography
          variant="h5"
          className="h-20 pt-10 font-bold text-blue-gray-600"
        >
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
};

StatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
};

// StatisticsCard.displayName = "/src/widgets/cards/statistics-card.jsx";

export default StatisticsCard;
