import google from "@/public/google.svg";
import Image from "next/image";

const page = () => {
  return (
    <div className="flex">
      <div className="w-2/4">
        <video class="wix-auth-sidebar__media" muted autoplay loop poster="https://cdn.dribbble.com/uploads/59679/original/47ad513f3f391fb742485bb844964c06.jpg?1733426617" src="https://cdn.dribbble.com/uploads/59677/original/1e3ef22a333a3e9891f2c3a6ead881a4.mp4?1733426247">
      </video>
      </div>
    <div className="flex items-center justify-center">
      <div className="lg:w-full ml-10">
        <div className="justify-center items-center text-center mt-20">
          <h1 className="text-3xl font-bold">Sign Up to Dribble</h1>
        </div>
        <div className="text-center flex justify-center mt-10">
          <button className="border-2 flex justify-center items-center p-4  lg:w-full rounded-full bg-blue-950 text-white">
            <div className="flex gap-4">
              <Image src={google} alt="google" height={25} width={25}></Image>
              <b>Sign in with Google</b>
            </div>
          </button>
        </div>
        <div className="text-center items-center  flex w-full justify-center pt-5">
          <hr className="w-1/3"></hr>
          <h1 className="font-light text-light">or</h1>
          <hr className="w-1/3"></hr>
        </div>
        <div className="mt-8">
            <button className=" bg-white text-black rounded-full w-full h-16 border">
              Sign up to Continue
            </button>
          </div>
        <div className="pt-16 flex justify-center text-center ">
            <h1 className="text-sm">By creating an account you agree with our <u>Terms of Service, Privacy Policy,</u></h1>
            </div>
            <div>
            <h1 className="text-sm text-center">and our default <u>Notification Settings.</u></h1>
        </div>
        <div className="pt-10 items-center">
            <h1 className="text-sm text-center">Already have an account? <u>Sign In</u></h1>
        </div>
      </div>
    </div>
    </div>
  );
};

export default page;
