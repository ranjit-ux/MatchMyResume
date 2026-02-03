import resumeImg from "../assets/resume-sample.png";

const ResumeThumbnail = () => {
  return (
    <img
      src={resumeImg}
      alt="Resume thumbnail"
      className="h-40 w-full object-cover"
    />
  );
};

export default ResumeThumbnail;
