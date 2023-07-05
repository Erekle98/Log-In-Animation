import { useRive, useStateMachineInput } from "@rive-app/react-canvas";
import { useState } from "react";

const states = {
  look: "Look",
  check: "Check",
  success: "success",
  fail: "fail",
  handsUp: "hands_up",
};

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const STATE_MACHINE_NAME = "State Machine 1";
  const { rive, RiveComponent } = useRive({
    src: "login_screen_character.riv",
    artboard: "Artboard",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
  });

  const onClickSuccessInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    states.success
  );

  const onClickFailInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    states.fail
  );

  const onFocusUsernameInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    states.check
  );

  const onChangeUsernameInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    states.look
  );

  const onFocusPasswordInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    states.handsUp
  );

  return (
    <div className="flex items-center flex-col">
      <div className="w-[300px] h-[300px] relative">
        <RiveComponent />
      </div>
      <div className="border-x-[2px] border-b-[2px] rounded-b-2xl p-[1rem] flex flex-col items-center w-[300px]">
        <h1 className="text-2xl font-bold">Log In</h1>
        <div className="flex flex-col items-center">
          <input
            type="text"
            className="border-[2px] border-gray-400 rounded-md p-2 w-[200px] mb-2"
            placeholder="Username"
            onFocus={() => {
              onFocusUsernameInput.value = true;
            }}
            onBlur={() => {
              onFocusUsernameInput.value = false;
            }}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              onChangeUsernameInput.value = e.target.value.length * 3;
            }}
          />
          <input
            type="password"
            className="border-[2px] border-gray-400 rounded-md p-2 w-[200px] mb-2"
            placeholder="Password"
            onFocus={() => {
              onFocusPasswordInput.value = true;
            }}
            onBlur={() => {
              onFocusPasswordInput.value = false;
            }}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            className="bg-blue-500 text-white rounded-md p-2 w-[100px]"
            onClick={(e) => {
              e.preventDefault();
              if (username.length > 3) {
                onClickSuccessInput.fire();
              } else {
                onClickFailInput.fire();
              }
            }}
          >
            Log In
          </button>
          <div className="mt-4">
            * Type less than 4 symbols in Username input to fail
          </div>
        </div>
      </div>
    </div>
  );
}
