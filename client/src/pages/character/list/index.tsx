import React, { FC, useEffect } from "react";
import { Col, Row, Skeleton } from "antd";

import { characterService } from "../../../api/characterService";
import { useApi } from "../../../utils/hooks";
import Card from "../../../components/FilmCard";
import Layout from "../../../components/Layout";

const CharacterPage: FC = () => {
  const { data, updateData } = useApi<Character[]>();

  useEffect(() => {
    (async () => {
      const res = await characterService.getCharacters();
      updateData(res.results);
    })();
  }, [updateData]);

  if (!data) {
    return (
      <Layout>
        <Skeleton loading active />
      </Layout>
    );
  }

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        {data.map((hero) => (
          <Col xs={24} md={8}>
            <Card title={hero.name} desc={hero.birth_year} />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default CharacterPage;
