import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Reviews from "./Reviews";

const API = process.env.REACT_APP_API_URL;
function BookmarkDetails() {
  const [bookmark, setBookmark] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/bookmarks/${id}`)
      .then((response) => {
        console.log(response.data);
        setBookmark(response.data);
      })
      .catch((e) => {
        console.warn("catch:", e);
      });
  }, [id]);

  const handleDelete = () => {
    // console.log("I clicked delete");
    deleteBookmark();
  };

  const deleteBookmark = () => {
    axios
      .delete(`${API}/bookmarks/${id}`)
      .then(() => {
        navigate(`/bookmarks`);
      })
      .catch((e) => {
        console.warn("catch:", e);
      });
  };

  return (
    <article>
      <h3>
        {bookmark.is_favorite ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={bookmark.url}>{bookmark.name}</a>
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {bookmark.url}
      </h5>
      <h6>{bookmark.category}</h6>
      <div className="showNavigation">
        <div>
          <Link to={`/bookmarks`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/bookmarks/id/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
      <Reviews />
    </article>
  );
}

export default BookmarkDetails;
