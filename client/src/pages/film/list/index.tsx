import React, { FC, useEffect, useState } from "react";
import { Col, Divider, Row } from "antd";
import Search from "antd/es/input/Search";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/FilmCard";
import Layout from "../../../components/Layout";
import Loader from "../../../components/Loader";
import { useApi } from "../../../hooks/useApi";
import { redirect } from "../../../utils";
import { PathsEnum } from "../../../utils/enums";
import { filmsService } from "../../../api/filmService";

const FilmsList: FC = () => {
  const { data, updateData, isLoading, updateLoading } = useApi<Film[]>();
  const [search, setSearch] = useState("");
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      updateLoading(true);
      const res = await filmsService
        .getFilms(search)
        .finally(() => updateLoading(false));
      updateData(res.results);
    })();
  }, [updateData, updateLoading, search]);

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Search
            placeholder="Enter text"
            size="large"
            loading={isLoading}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Divider orientation="left">Films list:</Divider>
      <Row gutter={[16, 16]}>
        {data.map((film) => (
          <Col xs={24} md={8} key={film.created}>
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

export default FilmsList;
