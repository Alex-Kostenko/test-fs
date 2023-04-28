import React, { FC, useEffect } from "react";
import { Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/FilmCard";
import Layout from "../../../components/Layout";
import { filmsService } from "../../../api/filmService";
import { useApi } from "../../../utils/hooks";
import { redirect } from "../../../utils";
import { PathsEnum } from "../../../utils/enums";
import Loader from "../../../components/Loader";

const HomePage: FC = () => {
  const { data, updateData } = useApi<Film[]>();
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const res = await filmsService.getFilms();
      updateData(res.results);
    })();
  }, [updateData]);

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        {data.map((film) => (
          <Col xs={24} md={8}>
            <Card
              title={`${film.title} (ep.${film.episode_id})`}
              desc={film.opening_crawl}
              onClick={() => redirect(film.url, PathsEnum.film, ":filmId", nav)}
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
