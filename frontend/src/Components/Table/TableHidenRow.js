import React from "react";
import { ConfigProvider, Table } from "antd";
import styled from "styled-components";

export default function TableHidenRow({ columns, isShow, data, setIsShow }) {
  return (
    <ConfigProvider renderEmpty={() => <></>}>
      <MyTable
        columns={columns}
        dataSource={isShow ? data : []}
        style={{
          width: "100%",
          backgroundColor: "white",
          paddingTop: "10px",
        }}
        pagination={false}
        onHeaderRow={() => {
          return {
            onClick: (event) => {
              setIsShow();
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
        border-top: 1px solid rgba(5, 5, 5, 0.06);
      }
    }
  }

  td {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    background-color: white !important;
    border: none !important;
  }
  tr {
    border: none;
  }
`;
