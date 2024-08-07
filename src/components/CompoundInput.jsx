import React from "react";
import { Slider, Grid, Input, Typography, Box } from "@mui/material";

const CompoundInput = ({
  getter,
  setter,
  handleSlider,
  handleInput,
  title,
  min,
  max,
  step,
  unit,
}) => {
  return (
    <div className="input-grid">
      <Typography
        id="input-slider"
        sx={{ color: "#ffffff", textAlign: "left", gridRow: "1"}}
        fontFamily={"bebas-neue-pro"}
        fontSize={14}
        textTransform={"uppercase"}
        fontWeight={"thin"}
        gutterBottom
        marginBottom={0}
      >
        {title} ({unit})
      </Typography>
      <Slider
        aria-label={title}
        sx={{color: "#ffffff", gridRow: "2"}}
        min={min}
        max={max}
        step={step}
        value={getter}
        onChange={handleSlider(setter)}
        valueLabelDisplay="auto"
      />
      <Input
        sx={{
          color: "#ffffff",
          marginBottom: 3,
          marginLeft: 2,
          width: 70,
          fontFamily: "bebas-neue-pro",
          gridRow: "2",
        }}
        value={getter || ""}
        size="small"
        onChange={handleInput(setter)}
        inputProps={{
          step: step,
          min: min,
          max: max,
          type: "number",
          "aria-labelledby": "input-slider",
        }}
      />
    </div>
  );
};

export default CompoundInput;
