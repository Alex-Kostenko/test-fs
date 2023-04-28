import { Card as AntCard } from "antd";
import Meta from "antd/es/card/Meta";
import React, { FC } from "react";

interface CardProps {
  title: string;
  desc: string;
  onClick?: () => void;
}

const Card: FC<CardProps> = ({ title, desc, onClick }) => {
  return (
    <AntCard hoverable title={title} onClick={onClick}>
      <Meta description={desc} />
    </AntCard>
  );
};

export default Card;
