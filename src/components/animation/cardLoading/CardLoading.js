import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Placeholder } from "semantic-ui-react";

function CardLoading(props) {
  const { actionTypes } = props;

  switch (actionTypes) {
    case "post":
      return (
        <Placeholder
          fluid
          style={{
            border: "20px solid white",
            borderRadius: 10,
            width: 620,
            marginLeft: 40,
          }}
        >
          <Placeholder.Header
            image
            style={{
              backgroundColor: "rgb(236 236 236)",
              border: "none",
              zIndex: 1,
            }}
          >
            <Placeholder.Line length="very short" />
            <Placeholder.Line />
            <Placeholder.Line length="very short" />
          </Placeholder.Header>
          <Placeholder.Paragraph
            style={{ width: "100%", height: 467 }}
          ></Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder>
      );
    case "detailsPost":
      return (
        <Placeholder
          fluid
          style={{
            border: "20px solid white",
            borderRadius: 10,
            position: "absolute",
            width: 800,
            height: 600,
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            margin: "auto",
            display: "flex",
          }}
        >
          <Placeholder.Paragraph
            style={{
              width: "60%",
              height: "100%",
              borderRight: "10px solid white",
              borderTop: "5px solid white",
            }}
          ></Placeholder.Paragraph>
          <Placeholder.Paragraph
            style={{
              width: "40%",
              height: "104%",
              marginTop: "-19px",
            }}
          >
            <Placeholder.Paragraph
              style={{
                width: "100%",
                height: "15%",
                border: "5px solid white",
              }}
            ></Placeholder.Paragraph>
            <Placeholder.Paragraph
              style={{
                width: "100%",
                height: "60%",
                border: "5px solid white",
              }}
            ></Placeholder.Paragraph>
            <Placeholder.Paragraph
              style={{
                width: "100%",
                height: "25%",
                border: "5px solid white",
              }}
            ></Placeholder.Paragraph>
          </Placeholder.Paragraph>
        </Placeholder>
      );
    default:
      return (
        <Placeholder
          fluid
          style={{ border: "20px solid white", borderRadius: 10 }}
        >
          <Placeholder.Header
            image
            style={{
              backgroundColor: "rgb(236 236 236)",
              border: "none",
              zIndex: 1,
            }}
          >
            <Placeholder.Line length="very short" />
            <Placeholder.Line />
            <Placeholder.Line length="very short" />
          </Placeholder.Header>
          <Placeholder.Paragraph
            style={{ width: "100%", height: 467 }}
          ></Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder>
      );
  }
}

export default CardLoading;
