import React, { FC, useEffect, useState } from "react";
import { Col, Divider, Pagination, Row, Input } from "antd";
import { useNavigate } from "react-router-dom";

import Card from "../../../components/FilmCard";
import Layout from "../../../components/Layout";
import Loader from "../../../components/Loader";
import { PathsEnum } from "../../../utils/enums";
import { useApi } from "../../../hooks/useApi";
import { redirect } from "../../../utils";
import { characterService } from "../../../api/characterService";

const { Search } = Input;

const CharacterPage: FC = () => {
  const {
    data,
    updateData,
    isLoading,
    updateLoading,
    page,
    updatePage,
    count,
    updateCount,
  } = useApi<Character[]>();
  const [search, setSearch] = useState("");

  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      updateLoading(true);
      const res = await characterService
        .getCharacters(search, page)
        .finally(() => updateLoading(false));
      updateData(res.results);
      updateCount(res.count);
    })();
  }, [updateData, updateCount, updateLoading, page, search]);

  const handleSearch = (value: string) => {
    updatePage(1);
    setSearch(value);
  };

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
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Divider orientation="left">Characters list:</Divider>
      <Row gutter={[16, 16]}>
        {data?.map((hero) => (
          <Col xs={24} md={8} key={hero.name}>
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
      <Divider orientation="left" />
      <Pagination
        current={page}
        onChange={updatePage}
        total={count}
        showSizeChanger={false}
      />
    </Layout>
  );
};

export default CharacterPage;
