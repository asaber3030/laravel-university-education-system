const RenderHTML = ({ data }) => {

  const [html, setHTML] = useState({__html: ""});

  useEffect(() => {
    async function createMarkup() {
      let response;
      response = await fetch(`http://localhost:8000/backed_api/html_response/?user_email=chriss%40comtura.ai`)
      const backendHtmlString = await response.text()

      console.log(backendHtmlString)
      return {__html: backendHtmlString};
    }
    createMarkup().then(result => setHTML(result));
  }, []);


  return <div dangerouslySetInnerHTML={data} />;
}

export default RenderHTML
