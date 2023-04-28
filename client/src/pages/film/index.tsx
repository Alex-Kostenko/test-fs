import React, { FC, useEffect } from "react";
import { Descriptions } from "antd";

import Layout from "../../components/Layout";
import { filmsService } from "../../api/filmService";
import { useApi } from "../../utils/hooks";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";

const { Item } = Descriptions;

const FilmPage: FC = () => {
  const { data, updateData } = useApi<Film>();
  const { filmId } = useParams();

  useEffect(() => {
    (async () => {
      if (filmId) {
        const res = await filmsService.getFilmById(filmId);
        updateData(res);
      }
    })();
  }, [updateData, filmId]);

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Descriptions title="Detailed Information" bordered>
        <Item label="Title" span={2}>
          {data.title}
        </Item>
        <Item label="Episode" span={3}>
          {data.episode_id}
        </Item>
        <Item label="Opening Crawl" span={3}>
          {data.opening_crawl}
        </Item>
        <Item label="Producer" span={3}>
          {data.producer}
        </Item>
        <Item label="Release Date" span={3}>
          {data.release_date}
        </Item>
      </Descriptions>
    </Layout>
  );
};

export default FilmPage;
