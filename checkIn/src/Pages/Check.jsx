import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  add_topic,
  get_all_pending,
  recommendTopic,
} from "../apiFunction/apiFunction";
import Swal from "sweetalert2";
import { useTable } from "react-table";
import clsx from "clsx";

const Table = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{ border: "1px solid black", width: "100%" }}
    >
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "1px solid black",
                  padding: "8px",
                }}
                className="bg-primary-500 text-white"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              style={{
                borderBottom: "1px solid black",
                padding: "8px",
              }}
              className="text-center"
            >
              {row.cells.map((cell) => (
                <td className="p-2" {...cell.getCellProps()}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

function Check() {
  const p = useLoaderData();

  const [allPending, setPending] = useState(p);

  const addToTpic = (data) => {
    console.log(data)
    add_topic(data).then((res) => {
      console.log(res)
      if (res) {
        if (res.code === 11000) {
          Swal.fire({
            title: "แจ้งเตือน",
            text: "มีหัวข้อนี้แล้ว",
            icon: "error",
            confirmButtonText: "รับทราบ",
            confirmButtonColor: "#FF8C00",
          }).then(() => {
            get_all_pending().then((res) => {
              setPending(res);
            });
          });
        } else {
          Swal.fire({
            title: "แจ้งเตือน",
            text: "ยืนยันหัวข้อเรียบร้อย",
            icon: "success",
            confirmButtonText: "รับทราบ",
            confirmButtonColor: "#FF8C00",
          }).then(() => {
            get_all_pending().then((res) => {
              setPending(res);
            });
          });
        }
      }
    });
  };

  const addRecommend = (id, recommend) => {
    recommendTopic({ id, recommend: !recommend }).then((res) => {
      if (res) {
        if (res.code === 11000) {
          Swal.fire({
            title: "แจ้งเตือน",
            text: "มีบางอย่างผิดพลาด",
            icon: "error",
            confirmButtonText: "รับทราบ",
            confirmButtonColor: "#FF8C00",
          }).then(() => {
            get_all_pending().then((res) => {
              setPending(res);
            });
          });
        } else {
          Swal.fire({
            title: "แจ้งเตือน",
            text: "ตั้งค่าการแนะนำเรียบร้อย",
            icon: "success",
            confirmButtonText: "รับทราบ",
            confirmButtonColor: "#FF8C00",
          }).then(() => {
            get_all_pending().then((res) => {
              setPending(res);
            });
          });
        }
      }
    });
  };

  const category = ["Basic", "Intermediate", "Advance"];

  const columns = [
    { Header: "หัวข้อ", accessor: "title" },
    { Header: "พูดโดย", accessor: "speaker" },
    {
      Header: "ความยาว",
      accessor: "long_duration",
      Cell: ({ row }) => (row.values.long_duration ? "1 ชั่วโมง" : "30 นาที"),
    },
    {
      Header: "ประเภท",
      accessor: "category",
      Cell: ({ row }) => category[row.values.category],
    },
    { Header: "คำบรรยาย", accessor: "description" },
    {
      Header: "แนะนำ",
      Cell: ({ row }) => (
        <button
          className={clsx(
            " p-2 text-white rounded-lg",
            row.original.recommend ? "bg-green-500" : "bg-primary-500"
          )}
          onClick={() => addRecommend(row.original._id, row.original.recommend)}
        >
          {row.original.recommend ? "แนะนำแล้ว" : "แนะนำ"}
        </button>
      ),
    },
    {
      Header: "Action",
      Cell: ({ row }) => (
        <button
          onClick={() => addToTpic(row.original)}
          className="bg-green-500 p-2 text-white rounded-lg"
        >
          เพิ่มหัวข้อ
        </button>
      ),
    },
  ];

  return (
    <div className="container max-w-3xl mx-auto pt-10">
      <div className="space-y-5">
        {allPending ? (
          //  allPending
          //     .filter((topic) => topic.title !== "" && !topic.check)
          //     .map((data) => (
          //       <div
          //         className="p-4 shadow-md w-full rounded-lg space-y-3"
          //         key={data._id}
          //       >
          //         <p>หัวข้อ : {data.title}</p>
          //         <p>พูดโดย : {data.speaker}</p>
          //         <p>
          //           ความยาว : {data.long_duration ? "1 ชั่วโมง" : "30 นาที"}
          //         </p>
          //         <p>ประเภท : {category[data.category]}</p>
          //         <p>คำบรรยาย : {data.description}</p>
          //         <button
          //           onClick={() => addToTpic(data)}
          //           className="bg-green-500 text-white p-2 w-full rounded-lg"
          //         >
          //           ยืนยัน
          //         </button>
          //       </div>
          //     ))
          <Table columns={columns} data={allPending.filter(topic => !topic.check)} />
        ) : null}
      </div>
    </div>
  );
}

export default Check;
