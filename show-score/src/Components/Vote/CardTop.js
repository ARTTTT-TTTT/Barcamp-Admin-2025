import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";

function CardTop({ data, index, isLongList }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.3)",
      }}
      initial={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        elevation={4}
        sx={{
          backgroundColor: `rgba(254, 238, 145, ${4 / (index + 1)})`,
          borderRadius: "1rem",
          position: "relative",
          justifyItems: "center",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          border: "2px solid rgba(0, 0, 0, 0.05)",
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: isLongList ? "65px" : "85px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              textAlign: "center",
              maxWidth: "170px",
              marginRight: "38px",
            }}
          >
            <Typography
              fontWeight="bold"
              noWrap
              textOverflow="ellipsis"
              paddingTop={"5px"}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                whiteSpace: "pre-wrap",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
              variant="h6"
              pr={"10px"}
            >
              {data.title}
            </Typography>
            <Typography
              fontWeight="normal"
              variant="h6"
              sx={{
                animation: "fadeIn 1s ease-in-out",
              }}
            >
              by {data.speaker}
            </Typography>
          </motion.div>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            style={{
              position: "absolute",
              right: "0",
              margin: "12px",
            }}
          >
            <Typography
              fontWeight="bold"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "100%",
                width: "1rem",
                height: "1rem",
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "3px 3px 10px rgba(0, 0, 0, 0.2)",
              }}
              variant="h6"
            >
              {data.votes}
            </Typography>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default CardTop;
