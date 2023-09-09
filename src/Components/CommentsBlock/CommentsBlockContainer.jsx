import React, { useEffect, useState } from "react";
import commentsBlock_style from "./CommentsBlock.scss"
import CommentsBlock from "./CommentsBlock.jsx";
import CommentPage from "./CommentPage/CommentPage.jsx";
import Comment from "./Comment/Comment.jsx"

const CommentsBlockContainer = (props) => {

    // Для використання блоку комментарів, йому потрібно передати пропсами об`єкт data, який має вигляд:
    //
    //   commentsData: props.commentsData,
    //   dispatch: props.dispatch,
    //   commentsDAL: props.commentsDAL,
    //   animeID: animeID,
    //   checkerUpdate: props.commentsData.checkerUpdate,
    //   authData: props.authData
    //

    useEffect(() => {props.data.dispatch(props.data.commentsDAL.showAnimeIdFirstCommentsPage(props.data.animeID))}, []);
    
    useEffect(() => {
        props.data.dispatch(props.data.commentsDAL.getAnimeIdCountComments(props.data.animeID));
    }, [props.data.checkerUpdate]);

    //------- Створювання сторінок комментарів і їх функції

    const showAnimeIdActiveCommentsPage = (selectedPage) => {
        props.data.dispatch(props.data.commentsDAL.showAnimeIdActiveCommentsPage(parseInt(selectedPage.target.innerText), props.data.animeID));
    };

    let commentsPagesCount = Math.ceil(props.data.commentsData.commentsLength / 5);
    let commentsPages = [];

    for (let i = 1; i < commentsPagesCount + 1; i++) {
        commentsPages.push(<CommentPage key={i + "key"} id={i} className={props.data.commentsData.activePage == i ? commentsBlock_style.active : commentsBlock_style.notActive} showAnimeIdActiveCommentsPage={showAnimeIdActiveCommentsPage} />);
    }
    //-------

    //------- Створювання комментарів і їх функції

    let placeholder = "Щоб залишити коментар, потрібно зареєструватись!";

    if (props.data.authData.authStatus === true) {
        placeholder = "Введіть коментар";
    }

    const [inputText, setInputText] = useState("");

    const addComment = (text) => {
        props.data.dispatch(props.data.commentsDAL.addCommentToAnimePage(text, props.data.animeID));
        setInputText("");
    };

    const setNewInputText = (value) => {
        props.data.dispatch({ type: "setNewInputText", value: value });
    }

    let comments = [];
    props.data.commentsData.comments.map(c => {
        comments.push(<Comment text={c.text} key={c.id} />)
    })
    //-------

    const data = {
        addComment: addComment,
        setNewInputText: setNewInputText,
        inputText: inputText,
        setInputText: setInputText,
        comments: comments,
        commentsPages: commentsPages,
        placeholder: placeholder,
        authStatus: props.data.authData.authStatus
    }

    return <CommentsBlock data={data} />
}

export default CommentsBlockContainer;