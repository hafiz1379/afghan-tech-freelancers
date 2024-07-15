import React, { useState } from "react";

function OnCashPay() {
  const [documents, setDocuments] = useState();
  const handleSubmit = () => {};
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-[600px] p-5 my-3 rounded border mx-auto"
      >
        <div>Include</div>
      </form>
    </div>
  );
}

export default OnCashPay;
