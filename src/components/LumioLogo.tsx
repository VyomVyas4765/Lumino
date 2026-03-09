import lumioLogo from "@/assets/Lumio,png-Picsart-BackgroundRemover.png";

const LumioLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <img
        src={lumioLogo}
        alt="Lumio logo"
        className="h-20 w-22 object-contain"
      />
      <span className="text-2xl font-extrabold tracking-tight text-foreground">
        Lumio
      </span>
    </div>
  );
};

export default LumioLogo;
