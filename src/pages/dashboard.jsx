import { getClicksForUrls } from "@/api/apiClicks";
import { getUrls } from "@/api/apiUrls";
import CreateLink from "@/components/create-link";
import Error from "@/components/error";
import LinkCard from "@/components/link-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UrlState } from "@/context";
import useFetch from "@/hooks/use-fetch";
import { Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = UrlState();
  const { loading, error, data: urls, fn: fnUrls } = useFetch(getUrls, user.id);
  // console.log("fn", useFetch(getUrls, user.id));
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    urls?.map((url) => url.id)
  );
  // console.log(
  //   "fnq",
  //   useFetch(
  //     getClicksForUrls,
  //     urls?.map((url) => url.id)
  //   )
  // );
  useEffect(() => {
    fnUrls();
  }, []);

  console.log("sq", searchQuery);
  console.log("du", urls);
  const filteredUrls = urls?.filter((url) => {
    console.log(url.title.toLowerCase());
    console.log(searchQuery.toLowerCase());
    console.log(url.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return url.title.toLowerCase().includes(searchQuery.toLowerCase());
    // return match;
  });
  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  console.log("fu", filteredUrls);
  return (
    <div className="flex flex-col gap-8">
      {loading ||
        (loadingClicks && <BarLoader width={"100%"} color="#36d7b7" />)}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">
          {" "}
          <h1 className="text-4xl font-extrabold">My Links</h1>
        </h1>
        {/* <Button>Create Link</Button>{" "} */}
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error.message} />}
      {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  );
};

export default Dashboard;
