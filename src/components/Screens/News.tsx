import { TvContext } from "@/context/TvContext";
import { months } from "@/lib/time";
import { useContext, useEffect, useState } from "react";

const News: React.FC = () => {
  const [news, setNews] = useState<News[] | null>(useContext(TvContext)?.news || null);
  useEffect(() => {
    if (!news || news.length <= 3) return;
    setNews(news != news.slice(0, 3) ? news?.slice(0, 3) : news);
  }, [news]);
  if (!news) return null;

  function article(n: News) {
    return (
      <div className="flex w-[33vw] flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold">{n.title}</h1>
        <p className="text-xl">{n.content}</p>
        <p className="text-sm uppercase">
          {((date) => {
            return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
          })(new Date(n.date))}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center py-2">
      <table className="w-full">
        <tbody className="w-full">
          <tr className="w-full">
            {news.map((n) => {
              if (!n.img) {
                return (
                  <td key={n.title} rowSpan={2}>
                    {article(n)}
                  </td>
                );
              }
              return (
                <td key={n.title}>
                  <div
                    style={{ backgroundImage: `url(${n.img})` }}
                    className="h-[35vh] w-full bg-cover bg-center"
                  ></div>
                </td>
              );
            })}
          </tr>
          <tr className="w-full">
            {news.map((n) => {
              if (n.img) return <td key={n.title}>{article(n)}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
/**
 *         <div key={n.title} className=" max-w-[25vw] text-center">
          {n.img && (
            <div style={{ backgroundImage: `url(${n.img})` }} className="min-h-[50%] w-full bg-cover bg-center" />
          )}
        </div>

 */
export default News;
