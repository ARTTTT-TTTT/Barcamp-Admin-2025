import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

function CardRange({ data }) {
  return (
    <Card sx={{ borderRadius: "1rem" }} elevation={4}>
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          fontWeight="bold"
          noWrap
          textOverflow="ellipsis"
          sx={{ width: "18rem" }}
          variant="h6"
        >
          {data.title}
        </Typography>
        <Typography
          sx={{
            backgroundColor: "#FEEE91",
            borderRadius: "100%",
            width: "0.05rem",
            height: "0.05rem",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            border: "2px solid #FFD700", 
            transition: "transform 0.2s ease", 
            "&:hover": {
              transform: "scale(1.1)", 
            },
          }}
          variant="h6"
          fontWeight="bold"
        >
          {data.votes}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CardRange;
