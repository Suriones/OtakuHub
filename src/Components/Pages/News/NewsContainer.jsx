import React, { useEffect, useState } from "react";
import NewsBlock from "./NewsBlock/NewsBlock.jsx"
import Loading from "../Loading/Loading.jsx";
import News from "./News.jsx";
import news_style from "./News.scss";

const NewsContainer = React.memo((props) => {

    useEffect(() => {
        props.dispatch(props.newsDAL.getAll());
    }, [props.checkerUpdate]);

    const sendToDAL = () => {
        props.dispatch(props.newsDAL.postNews(props.news.length, "News", addNewsTextArea.current.value));
        setInputText("");
    }

    const addNewsTextArea = React.createRef();
    const [inputText, setInputText] = useState("");

    let addNews;

    if (props.authData.authStatus === true && props.authData.admin === true) {
        addNews = <div className={news_style.addBlock}><p>Додати новину</p><textarea value={inputText} onChange={() => setInputText(addNewsTextArea.current.value)} ref={addNewsTextArea} className={news_style.addNewsText} /><button onClick={sendToDAL}>Додати</button></div>;
    }

    if (!props.news.length) {
        return <Loading />
    } else {

        let newsComponents = [];

        props.news.map(n => {
            newsComponents.push(<NewsBlock id={n.id} name={n.name} key={n.id} value={n.value} />);
        })

        return <News newsComponents={newsComponents} addNews={addNews} />
    }
})

export default NewsContainer;