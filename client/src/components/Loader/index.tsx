import React, { FC } from "react";
import { Skeleton } from "antd";
import Layout from "../Layout";

const Loader: FC = () => (
  <Layout>
    <Skeleton loading active />
  </Layout>
);

export default Loader;
