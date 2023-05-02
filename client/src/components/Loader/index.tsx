import React, { FC } from "react";
import { Skeleton } from "antd";
import Layout from "../Layout";

const Loader: FC = () => (
  <Layout>
    <Skeleton loading active data-testid="status" />
  </Layout>
);

export default Loader;
