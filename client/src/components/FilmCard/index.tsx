import { Card as AntCard } from "antd";
import React, { FC } from "react";

const { Meta } = AntCard;

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
