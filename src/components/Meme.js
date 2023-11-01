import { useState, useEffect } from "react";

export default function Header() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  });
  const [allMeme, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function newMeme() {
    const randomNumber = Math.floor(Math.random() * allMeme.length);
    const url = allMeme[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="top text"
          name="topText"
          className="form-input"
          value={meme.topText}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          placeholder="bottom text"
          name="bottomText"
          className="form-input"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <br />
        <button className="new-meme" onClick={newMeme}>
          new meme image &#128444;
        </button>
        <div className="meme">
          <img src={meme.randomImage} className="meme-image" alt="" />
          <h2 className="meme-text top">{meme.topText}</h2>
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}
