import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts";
import utilStyles from "../styles/utils.module.css";
import Profile from "./profile";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Home({ allPostsData }) {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  function debouce(fn) {
    let a = "",
      timerid;
    return function (e) {
      a = a + e;
      clearTimeout(timerid);
      timerid = setTimeout(function () {
        return fn.apply(this, [a]);
      }, 2000);
    };
  }

  const getvalue = debouce(setInputValue);

  const handleChange = useCallback((e) => {
    const value = e.target.value;
    console.log("targetvalue", value);
    getvalue(value);
  }, []);

  return (
    <Layout home>
      <h1>Welcome to next.js!</h1>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <h2>
          <Profile />
        </h2>
        <input onChange={handleChange} value={inputValue} />
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </li>
          ))}
        </ul>

        <ul className={utilStyles.list}>
          {todos.length
            ? todos.map(({ id, userId, title, completed }) => (
                <li className={utilStyles.listItem} key={id}>
                  <Link href={`/posts/${id}`}>
                    <a>{title}</a>
                  </Link>
                  <br />
                  <small className={utilStyles.lightText}>{userId}</small>
                  <small className={utilStyles.lightText}>{completed}</small>
                </li>
              ))
            : null}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData },
  };
}
