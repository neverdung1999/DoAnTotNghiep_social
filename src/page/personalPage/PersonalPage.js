import React from "react";
import Personal from "../../components/personal/Personal";

function PersonalPage(props) {
  const { history } = props;
  console.log(history);
  return (
    <div>
      <Personal history={history} />
    </div>
  );
}

export default PersonalPage;
