import React, { FC, useEffect } from "react";
import { Descriptions } from "antd";
import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import { useApi } from "../../hooks/useApi";
import { PathsEnum } from "../../utils/enums";
import { characterService } from "../../api/characterService";

const { Item } = Descriptions;

const CharactersPage: FC = () => {
  const { data, updateData } = useApi<Character>();
  const { characterId } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      if (characterId) {
        const res = await characterService.getCharacterById(characterId);
        updateData(res);
      } else {
        nav(PathsEnum.characters);
      }
    })();
  }, [updateData, nav, characterId]);

  if (!data) {
    return <Loader />;
  }

  return (
    <Layout>
      <Descriptions title="Detailed Information" bordered>
        <Item label="Title" span={2}>
          {data.name}
        </Item>
        <Item label="Birth year" span={2}>
          {data.birth_year}
        </Item>
        <Item label="Eye color" span={2}>
          {data.eye_color}
        </Item>
        <Item label="Gender" span={2}>
          {data.gender}
        </Item>
        <Item label="Hair color" span={2}>
          {data.hair_color}
        </Item>
        <Item label="Height" span={2}>
          {data.height}
        </Item>
        <Item label="Mass" span={2}>
          {data.mass}
        </Item>
        <Item label="Skin color" span={2}>
          {data.skin_color}
        </Item>
      </Descriptions>
    </Layout>
  );
};

export default CharactersPage;
