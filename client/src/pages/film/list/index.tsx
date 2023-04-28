import React, { FC, useEffect } from "react";
import { Col, Row, Skeleton } from "antd";

import Card from "../../../components/FilmCard";
import Layout from "../../../components/Layout";
import { filmsService } from "../../../api/filmService";
import { useApi } from "../../../utils/hooks";

const HomePage: FC = () => {
  const { data, updateData } = useApi<Film[]>();

  useEffect(() => {
    (async () => {
      const res = await filmsService.getFilms();
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
        {data.map((film) => (
          <Col xs={24} md={8}>
            <Card
              title={`${film.title} (ep.${film.episode_id})`}
              desc={film.opening_crawl}
            />
          </Col>
        ))}
      </Row>
    </Layout>
  );
};

export default HomePage;
