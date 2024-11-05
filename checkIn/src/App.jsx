import React, { useEffect, useState } from "react";
import { addtoPending, getUser } from "./apiFunction/apiFunction";
import Swal from "sweetalert2";
import { QrReader } from "react-qr-reader";
import { QrScanner } from "@yudiel/react-qr-scanner";

function App() {
  const [topic, setTopic] = useState(null);
  const [found, setFound] = useState(false);
  const [IsSpeaker, setIsSpeaker] = useState(false);
  const [id, setId] = useState("");

  const onClickSearch = () => {
    getUser({ id })
      .then((data) => {
        if (data) {
          if (data.speaker) {
            setFound(true);
            setTopic({
              title: data.title,
              speaker: data.speaker,
              long_duration: data.long_duration,
              description: data.description,
              category: data.category,
            });
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const clear_all_state = () => {
    setTopic(null);
    setIsSpeaker(false);
    setFound(false);
    setId(null);
  };

  const postTopic = () => {
    addtoPending({ ...topic, id_speaker: id }).then((data) => {
      Swal.fire({
        title: "แจ้งเตือน",
        text: "เพิ่ม/อัพเดท เรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "รับทราบ",
        confirmButtonColor: "#FF8C00",
      }).then(() => {
        clear_all_state();
      });
    });
  };

  const onlyJoined = () => {
    addtoPending({ ...topic, id_speaker: id, title: "" }).then((data) => {
      Swal.fire({
        title: "แจ้งเตือน",
        text: "เข้าร่วมเรียบร้อยแล้ว",
        icon: "success",
        confirmButtonText: "รับทราบ",
        confirmButtonColor: "#FF8C00",
      }).then(() => {
        clear_all_state();
      });
    });
  };

  useEffect(() => {
    if (!!id) {
      onClickSearch();
    }
  }, [id]);

  return (
    <div className="container mx-auto max-w-3xl">
      <div className="flex flex-col items-center justify-center h-screen space-y-5 p-4">
        {!found ? (
          <div className="w-80 h-80">
            <QrScanner
              videoStyle={{ objectFit : "cover" }}
              constraints
              stopDecoding={!!id}
              onDecode={(result) => {
                //console.log(result)
                if (!!result) {
                  if (!found) {
                    setId(result);
                  }
                }
              }}
              onError={(error) => console.log(error?.message)}
            />
          </div>
        ) : null}

        {!found ? (
          <div className="w-full space-y-3">
            <input
              placeholder="ID"
              className="p-2 bg-gray-200 w-full outline-none rounded-lg"
              onChange={(e) => setId(e.target.value)}
              defaultValue={id}
            ></input>
            <button
              onClick={onClickSearch}
              className="bg-primary-500 text-white p-2 w-full rounded-lg"
            >
              ค้นหา
            </button>
          </div>
        ) : null}

        {found && !IsSpeaker ? (
          <div className="w-full">
            <p className="text-center text-2xl mb-10">
              ยินดีต้อนรับคุณ {topic?.speaker}
            </p>
            <div className="w-full h-60 space-x-10 flex justify-between">
              <button
                onClick={() => setIsSpeaker(true)}
                className="w-full h-full bg-green-500 rounded-xl text-white font-bold text-2xl"
              >
                เป็น Speaker
              </button>
              <button
                onClick={onlyJoined}
                className="w-full h-full bg-primary-500 rounded-xl text-white font-bold text-2xl"
              >
                เข้าร่วมอย่างเดียว
              </button>
            </div>
          </div>
        ) : null}

        {topic && IsSpeaker ? (
          <div className="flex flex-col w-full space-y-5 items-start">
            <p>หัวข้อ</p>
            <input
              onChange={(e) => setTopic({ ...topic, title: e.target.value })}
              className="p-2 bg-gray-200 w-full outline-none rounded-lg"
              type="text"
              defaultValue={topic.title}
            />
            <p>Speaker</p>
            <input
              onChange={(e) => setTopic({ ...topic, speaker: e.target.value })}
              className="p-2 bg-gray-200 w-full outline-none rounded-lg"
              type="text"
              defaultValue={topic.speaker}
            />
            <p>Description</p>
            <textarea
              onChange={(e) =>
                setTopic({ ...topic, description: e.target.value })
              }
              className="p-2 bg-gray-200 w-full outline-none rounded-lg"
              type="text"
              defaultValue={topic.description}
            />
            <p>ความยาว</p>
            <select
              onChange={(e) =>
                setTopic({ ...topic, long_duration: e.target.value })
              }
              className="p-2 bg-gray-200 w-full outline-none rounded-lg"
              defaultValue={topic.long_duration}
            >
              <option value={false}>30 นาที</option>
              <option value={true}>1 ชั่วโมง</option>
            </select>
            <p>ประเภท</p>
            <select
              onChange={(e) =>
                setTopic({ ...topic, category: parseInt(e.target.value) })
              }
              className="p-2 bg-gray-200 w-full outline-none rounded-lg"
              defaultValue={topic.category}
            >
              <option value={0}>Basic</option>
              <option value={1}>Intermediate</option>
              <option value={2}>Advance</option>
            </select>
            <button
              onClick={postTopic}
              className="bg-primary-500 text-white p-2 w-full rounded-lg"
            >
              เพิ่มเข้าหัวข้อ / อัพเดท
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
