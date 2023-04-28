import { Card as AntCard } from "antd";
import Meta from "antd/es/card/Meta";
import React, { FC } from "react";

interface CardProps {
  title: string;
  desc: string;
}

const Card: FC<CardProps> = ({ title, desc }) => {
  return (
    <AntCard hoverable title={title}>
      <Meta description={desc} />
    </AntCard>
  );
};

export default Card;
