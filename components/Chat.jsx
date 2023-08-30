const contract =
'8a6c221d64bdcd4dc32d5738d5b75dec12eb684faf7a11da87e6d24aa8763ff8';

State.init({
message: '',
});

const messages = Near.view(contract, 'get_messages', { limit: 5 });

const Message = styled.div`
display: flex;
gap: 1.2em;
`;

const SendControls = styled.div`
display: flex;
gap: 1em;
margin: 0.5em;
`;

const sendMessage = () => {
if (state.message.length != 0) {
  Near.call(contract, 'send', {
    text: state.message,
  });
}
};

return (
<>
  <pre>
    {JSON.stringify(
      Social.index('post', 'main', {
        accountId: 'nectar.near',
      }),
      null,
      2,
    )}
  </pre>
  <pre>{JSON.stringify(Social.get(`mob.near/widget/**`), null, 2)}</pre>
  {messages.reverse().map((message) => (
    <Message>
      <Widget
        src="calebjacob.near/widget/AccountProfile"
        props={{
          accountId: message.author,
        }}
      />
      <Widget
        src="andyh.near/widget/TimeAgo"
        props={{
          blockHeight: message.block_height,
        }}
      />
      <p>{message.text}</p>
    </Message>
  ))}
  <SendControls>
    <input
      type="text"
      onInput={(e) => State.update({ message: e.target.value })}
      value={state.message}
    />
    <button
      onClick={() => {
        sendMessage();
      }}
    >
      Send
    </button>
  </SendControls>
</>
);