import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({}));

export default function QtySpinner(props) {
  const [value, setValue] = useState(props.value);
  const classes = useStyles();
  const handleIncreament = () => {
    var c = value + 1;
    setValue(c);
    props.onChange(c);
  };

  const handleDecreament = () => {
    var c = value - 1;
    if (c >= 0) {setValue(c);
    props.onChange(c);}
  };
  const handleClick = () => {
    setValue(1);
    props.onChange(1);
  };
  return (
    <div>
      {value >= 1 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            onClick={() => handleIncreament()}
            style={{ background: "#880808", margin: 5, width: 30, height: 30 }}
          >
            +
          </Avatar>
          <span
            style={{
              fontWeight: 500,
              width: 35,
              justifyContent: "center",
              display: "flex",
            }}
          >
            {value}
          </span>
          <Avatar
            onClick={() => handleDecreament()}
            style={{ background: "#880808", margin: 5, width: 30, height: 30 }}
          >
            -
          </Avatar>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => handleClick()}
            style={{ color: "#FFF", width: 200, background: "#880808" }}
          >
            Add to cart
          </Button>
        </div>
      )}
    </div>
  );
}
