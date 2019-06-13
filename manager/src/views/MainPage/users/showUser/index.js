import React from "react";
import { Layout, Breadcrumb } from "antd";

function AddUser() {
  return (
    <Layout>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>
              <h2>用户展示</h2>
            </Breadcrumb.Item>
          </Breadcrumb>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default AddUser;
