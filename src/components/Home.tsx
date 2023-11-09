import { Container, Row } from "react-bootstrap";
import CardSpace from "./CardSpace";
import { useEffect, useState } from "react";

interface Reservation {
  id: number;
  events: [];
  image_url: string;
  featured: boolean;
  launches: [];
  news_site: string;
  published_at: string;
  summary: string;
  title: string;
  updated_at: string;
  url: string;
}

const Home = () => {
  const [news, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles")
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("errore brutto brutto nella fetch!");
        }
      })
      .then((data) => {
        console.log(data);
        setReservations(data.results);
      })
      .catch((err) => {
        console.log("ERRORE", err);
      });
  }, []);
  return (
    <Container>
      <h1 className="text-white my-3">THE SPACE NEWS</h1>
      <Row className="g-5">
        {news.map((r) => {
          return (
            <CardSpace
              title={r.title}
              imgUrl={r.image_url}
              key={r.id}
              date={r.published_at}
            />
          );
        })}
      </Row>
    </Container>
  );
};
export default Home;
