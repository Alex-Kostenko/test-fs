import React, { FC, useEffect } from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/FilmCard";
import Layout from "../../../components/Layout";
import { characterService } from "../../../api/characterService";
import { PathsEnum } from "../../../utils/enums";
import { useApi } from "../../../utils/hooks";
import { redirect } from "../../../utils";
import Loader from "../../../components/Loader";

const CharacterPage: FC = () => {
  const { data, updateData } = useApi<Character[]>();
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await characterService.getCharacters();
      updateData(res.results);
    })();
  }, [updateData]);

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        {data?.map((hero) => (
          <Col xs={24} md={8}>
            <Card
              title={hero.name}
              desc={hero.birth_year}
              onClick={() =>
                redirect(hero.url, PathsEnum.character, ":characterId", nav)
              }
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default CharacterPage;
