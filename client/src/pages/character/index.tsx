import React, { FC, useEffect } from "react";
import { Descriptions } from "antd";
import { useParams } from "react-router-dom";

import Layout from "../../components/Layout";
import { useApi } from "../../utils/hooks";
import { characterService } from "../../api/characterService";
import Loader from "../../components/Loader";

const { Item } = Descriptions;

const CharactersPage: FC = () => {
  const { data, updateData } = useApi<Character>();
  const { characterId } = useParams();

  useEffect(() => {
    (async () => {
      if (characterId) {
        const res = await characterService.getCharacterById(characterId);
        updateData(res);
      }
    })();
  }, [updateData, characterId]);

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Descriptions title="Detailed Information" bordered>
        <Item label="Title" span={2}>
          {data.birth_year}
        </Item>
        {/* <Item label="Episode" span={3}>
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
        </Item> */}
      </Descriptions>
    </Layout>
  );
};

export default CharactersPage;
