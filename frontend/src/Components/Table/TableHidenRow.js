import React, { useState } from "react";
import { ConfigProvider, Table } from "antd";
import styled from "styled-components";

export default function TableHidenRow({ columns, data }) {
  const [show, setShow] = useState(false);
  return (
    <ConfigProvider renderEmpty={() => <></>}>
      <div>
        <MyTable
          columns={columns}
          dataSource={show ? data : []}
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
      </div>
    </ConfigProvider>
  );
}

const MyTable = styled(Table)`
  thead {
    width: "35%";
    tr {
      th {
        padding-top: 8px !important;
        padding-bottom: 8px !important;
        background-color: white !important;
        text-transform: uppercase;
        font-size: 12px;
        cursor: pointer;
        width: "35%!important";
      }
      td {
        padding-top: 8px !important;
        padding-bottom: 8px !important;
        background-color: white !important;
        text-transform: uppercase;
        font-size: 12px;
        cursor: pointer;
        width: "35%!important";
        border-bottom: 1px solid gray;
      }
    }
  }
  tbody {
    tr {
      td {
        white-space: nowrap;
      word-break:break-word;
      word-break: break-all
        width: "35%!important";
      }
    }
  }

  td {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
    // background-color: white !important;
    border: none !important;
    border-bottom: 1px solid gray;
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
