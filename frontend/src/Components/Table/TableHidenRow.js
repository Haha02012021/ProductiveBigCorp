import React, { useState } from "react";
import { ConfigProvider, Table } from "antd";
import styled from "styled-components";

export default function TableHidenRow({ columns, data }) {
  const [show, setShow] = useState(false);
  return (
    <ConfigProvider renderEmpty={() => <></>}>
      <MyTable
        columns={columns}
        dataSource={show ? data : []}
        style={{
          width: "100%",
          backgroundColor: "white",
        }}
        pagination={false}
        onHeaderRow={() => {
          return {
            onClick: () => {
              setShow(!show);
            },
          };
        }}
        bordered={false}
      />
    </ConfigProvider>
  );
}

const MyTable = styled(Table)`
  thead {
    tr {
      th {
        padding-top: 8px !important;
        padding-bottom: 8px !important;
        background-color: white !important;
        text-transform: uppercase;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
  td {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    // background-color: white !important;
    border: none !important;
  }
  tr {
    // border: none;
    border-bottom: 1px solid gray;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2 !important;
  }
  tr:nth-type(odd) {
    background-color: white !important;
  }
  padding-top: 5px !important;
`;
