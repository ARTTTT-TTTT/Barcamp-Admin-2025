import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
  Button,
  Box,
} from "@mui/material";
import CardTop from "./CardTop";
import { AnimatePresence, motion } from "framer-motion";
import CardRange from "./CardRange";
import ReconnectingEventSource from "reconnecting-eventsource";
import config from "../../config";
import backend from "../../Services/backend";
import xlsx from "json-as-xlsx";
import Crab from "../Crab/Crab";
import Crab_small from "../Crab/Crab_small";
import AdjustableValue from "./Top_n";
import logobarcamp2 from "./logobarcamp2.png";
import Bird from "../Bird/Bird";

function Votepage() {
  const [value, setValue] = useState(10);

  const incrementValue = () => {
    setValue(value + 1);
  };

  const decrementValue = () => {
    setValue(value - 1);
  };
  const [allTopics, setAllTopics] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      backend.get('/topics_admin').then(res => {
        setAllTopics(res.data.topics_to_send);
      });
    }, 500);
  
    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    const es = new ReconnectingEventSource(config.apiUrlPrefix + "/sse");

    es.onmessage = async (event) => {
      let res = await JSON.parse(event.data);

      if (res.event === "vote") {
        setAllTopics((pre) =>
          pre.map((e) => {
            if (e._id === res.id) {
              e.votes = res.votes;
            }

            return e;
          })
        );
      }
    };

    return () => es.close();
  }, [allTopics]);

  const Summary = () => {
    let all = allTopics.sort((a, b) => b.votes - a.votes);
    let top10 = all.slice(0, 10);
    let long_duration_top_10 = top10.filter((e) => e.long_duration);
    let short_duration_top_10 = top10.filter((e) => !e.long_duration);
    let basic_topics = all.filter((e) => e.category === "Basic");
    let intermediate_topics = all.filter((e) => e.category === "Intermediate");
    let advance_topics = all.filter((e) => e.category === "Advance");
    let other = all.slice(10, all.length);
    let obj = [
      {
        sheet: "Top10 1Hr",
        columns: [
          { label: "title", value: (row) => row.title },
          { label: "speaker", value: (row) => row.speaker },
          { label: "votes", value: (row) => row.votes },
          { label: "category", value: (row) => row.category },
        ],
        content: long_duration_top_10,
      },
      {
        sheet: "Top10 30min",
        columns: [
          { label: "title", value: (row) => row.title },
          { label: "speaker", value: (row) => row.speaker },
          { label: "votes", value: (row) => row.votes },
          { label: "category", value: (row) => row.category },
        ],
        content: short_duration_top_10,
      },
      {
        sheet: "Other",
        columns: [
          { label: "title", value: (row) => row.title },
          { label: "speaker", value: (row) => row.speaker },
          {
            label: "duration",
            value: (row) => (row.long_duration ? "1 Hour" : "30 Minute"),
          },
          { label: "votes", value: (row) => row.votes },
          { label: "category", value: (row) => row.category },
        ],
        content: other,
      },
      {
        sheet: "Basic",
        columns: [
          { label: "title", value: (row) => row.title },
          { label: "speaker", value: (row) => row.speaker },
          {
            label: "duration",
            value: (row) => (row.long_duration ? "1 Hour" : "30 Minute"),
          },
          { label: "votes", value: (row) => row.votes },
          { label: "category", value: (row) => row.category },
        ],
        content: basic_topics,
      },
      {
        sheet: "Intermediate",
        columns: [
          { label: "title", value: (row) => row.title },
          { label: "speaker", value: (row) => row.speaker },
          {
            label: "duration",
            value: (row) => (row.long_duration ? "1 Hour" : "30 Minute"),
          },
          { label: "votes", value: (row) => row.votes },
          { label: "category", value: (row) => row.category },
        ],
        content: intermediate_topics,
      },
      {
        sheet: "Advance",
        columns: [
          { label: "title", value: (row) => row.title },
          { label: "speaker", value: (row) => row.speaker },
          {
            label: "duration",
            value: (row) => (row.long_duration ? "1 Hour" : "30 Minute"),
          },
          { label: "votes", value: (row) => row.votes },
          { label: "category", value: (row) => row.category },
        ],
        content: advance_topics,
      },
      {
        sheet: "All Topices",
        columns: [
          { label: "title", value: (row) => row.title },
          { label: "speaker", value: (row) => row.speaker },
          {
            label: "duration",
            value: (row) => (row.long_duration ? "1 Hour" : "30 Minute"),
          },
          { label: "votes", value: (row) => row.votes },
          { label: "category", value: (row) => row.category },
        ],
        content: all,
      },
    ];

    console.log(obj);

    let setting = {
      fileName: "SummaryVote",
      extraLength: 3,
      writeMode: "writeFile",
      writeOptions: {},
      RTL: false,
    };

    xlsx(obj, setting);
  };
  return (
    <div
      style={{
        background: "#ddf3ff",
        // "linear-gradient(180deg, #ddf3ff 0%, #ddf3ff 50%, #ddf3ff 100%)",
        width: "100%",
        height: "100vh",
      }}
    >
      <Container maxWidth="90%" sx={{ pt: "2rem", pb: "2rem", height: "100%" }}>
        <Grid container columns={10} spacing={2} sx={{ height: "100%" }}>
          <Grid item xl={4}>
            <Card
              elevation={5}
              sx={{
                height: "100%",
                borderRadius: "3rem",
                position: "relative",
                background: "#fff",
                zIndex: 1,
              }}
            >
              <CardContent sx={{ height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      fontWeight: "bold",
                      color: "#441752",
                      padding: "16px",
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",

                      // letterSpacing: "1px"
                    }}
                    marginLeft="auto"
                    marginRight="23%"
                    fontWeight="bold"
                    color="#441752"
                    variant="h3"
                  >
                    TOP {value}
                  </Typography>

                  <AdjustableValue
                    value={value}
                    onIncrement={incrementValue}
                    onDecrement={decrementValue}
                  />
                </div>
                <Grid
                  sx={{ height: "100%", mt: "1rem" }}
                  container
                  columns={12}
                  spacing={2}
                  justifyContent="flex-start"
                  alignContent="start"
                >
                  <AnimatePresence>
                    {allTopics
                      .sort((a, b) => b.votes - a.votes)
                      .filter((e) => e.votes >= 1)
                      .slice(0, value)
                      .map((e, i) => (
                        <Grid item xl={6} key={e._id}>
                          <motion.div
                            key={e._id}
                            layout
                            initial={{ translateY: 500 }}
                            animate={{ translateY: 0 }}
                            exit={{ translateY: 1000, opacity: 0, scale: 0 }}
                            transition={{ delay: 0.1 * i }}
                          >
                            <CardTop
                              index={i}
                              data={e}
                              {...(value > 10 && {
                                isLongList: true,
                              })}
                            />
                          </motion.div>
                        </Grid>
                      ))}
                  </AnimatePresence>
                </Grid>
              </CardContent>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                <Crab />
                <Crab_small />
                <Box
                  sx={{
                    backgroundColor: "#fecd64",
                    width: "100%",
                    height: "120px",
                    position: "absolute",
                    bottom: 0,
                    zIndex: -2,
                  }}
                >
                  <div
                    style={{
                      height: "3.12em",
                      width: "4.37em",
                      backgroundColor: "#B39659",
                      borderRadius: "50%",
                      position: "absolute",
                      bottom: "80px",
                      left: "-20px",
                      boxShadow: "2.5em 0.62em 0 -0.62em #716242",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#fecd64",
                        position: "absolute",
                        bottom: "-40px",
                        width: "100px",
                        height: "50px",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      height: "5em",
                      width: "8em",
                      backgroundColor: "#B39659",
                      borderRadius: "50%",
                      position: "absolute",
                      bottom: "70px",
                      right: "-20px",
                      boxShadow: "2.5em 0.62em 0 -0.62em #716242",
                      transform: "scaleX(-1)",
                    }}
                  >
                    <div
                      style={{
                        backgroundColor: "#fecd64",
                        position: "absolute",
                        bottom: "-30px",
                        width: "200px",
                        height: "50px",
                      }}
                    />
                  </div>
                </Box>
              </motion.div>
            </Card>
          </Grid>
          <Grid item xl={6}>
            <Card
              elevation={5}
              sx={{
                height: "100%",
                backgroundImage: `url(${logobarcamp2})`,
                backgroundSize: "50%",
                backgroundPosition: "center",
                borderRadius: "2rem",
                backgroundRepeat: "no-repeat",
                position: "relative",
                zIndex: 1,
              }}
              component={motion.div}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <CardContent
                sx={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#441752",
                  padding: "16px",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#441752",
                    variant: "h3",
                    marginTop: "16px",
                    animation: "pulse 2s infinite",
                  }}
                  component={motion.div}
                >
                  Topics
                </Typography>

                <style jsx>{`
                  @keyframes pulse {
                    0% {
                      transform: scale(3);
                    }
                    50% {
                      transform: scale(3.05);
                    }
                    100% {
                      transform: scale(3);
                    }
                  }
                `}</style>
                <Grid
                  sx={{ height: "100%", mt: "2rem" }}
                  container
                  columns={allTopics.length > 27 ? 20 : 12}
                  spacing={1}
                  align-self="start"
                  alignContent="start"
                >
                  <AnimatePresence>
                    {allTopics
                      .sort((a, b) => b.votes - a.votes)
                      .filter((e) => e.votes >= 1)
                      .slice(value, allTopics.length)
                      .map((e, i) => (
                        <Grid
                          key={e._id}
                          item
                          xl={4}
                          sx={{ zIndex: value, position: "relative" }}
                        >
                          <motion.div
                            key={e._id}
                            layout
                            initial={{
                              translateY: 500,
                              opacity: 0,
                              scale: 0.8,
                              rotate: -10,
                            }}
                            animate={{
                              translateY: 0,
                              opacity: 1,
                              scale: 1,
                              rotate: 0,
                              transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 10,
                                duration: 0.5,
                              },
                            }}
                            exit={{
                              scale: 0,
                              opacity: 0,
                              rotate: 10,
                              transition: {
                                duration: 0.3,
                                ease: "easeInOut",
                              },
                            }}
                          >
                            <CardRange data={e} />
                          </motion.div>
                        </Grid>
                      ))}
                  </AnimatePresence>
                </Grid>
                <Button
                  sx={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    fontSize: "18px",
                  }}
                  variant="contained"
                  color="primary"
                  onClick={Summary}
                >
                  Summary
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Bird />
    </div>
  );
}

export default Votepage;
