import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
} from "remotion";

const THEME = "#E94C2A";
const BLACK = "#11100F";
const SOFT = "#F6F2EF";
const FONT = '"Segoe UI", Arial, sans-serif';

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const scene = (frame: number, start: number, end: number) =>
  Math.min(
    interpolate(frame, [start, start + 8], [0, 1], clamp),
    interpolate(frame, [end - 8, end], [1, 0], clamp),
  );

const pop = (frame: number, at: number) =>
  spring({ frame: frame - at, fps: 30, config: { damping: 14, stiffness: 180 } });

const screen = (n: number) => staticFile(`resources/app-${String(n).padStart(2, "0")}.jpg`);

const PhoneShot: React.FC<{
  img: number;
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
  delay?: number;
  z?: number;
}> = ({ img, x, y, scale = 1, rotate = 0, delay = 0, z = 1 }) => {
  const frame = useCurrentFrame();
  const p = pop(frame, delay);
  const bob = Math.sin((frame + delay) / 9) * 5;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y + bob,
        width: 260,
        height: 578,
        borderRadius: 42,
        padding: 9,
        background: "#171313",
        boxShadow: "0 28px 70px rgba(17,16,15,.2)",
        opacity: interpolate(p, [0, 0.35], [0, 1], clamp),
        transform: `scale(${scale * (0.82 + p * 0.18)}) rotate(${rotate}deg)`,
        zIndex: z,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 22,
          left: 88,
          width: 86,
          height: 23,
          borderRadius: 18,
          background: "#111",
          zIndex: 4,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 34,
          overflow: "hidden",
          background: "#fff",
        }}
      >
        <Img
          src={screen(img)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

const Headline: React.FC<{
  children: React.ReactNode;
  start: number;
  top?: number;
  left?: number;
  size?: number;
  width?: number;
}> = ({ children, start, top = 110, left = 96, size = 72, width = 740 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + 10], [0, 1], {
    ...clamp,
    easing: ease,
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        color: THEME,
        fontFamily: FONT,
        fontSize: size,
        fontWeight: 900,
        lineHeight: 0.98,
        letterSpacing: 0,
        opacity: p,
        transform: `translateY(${(1 - p) * 20}px)`,
      }}
    >
      {children}
    </div>
  );
};

const Body: React.FC<{
  children: React.ReactNode;
  start: number;
  top: number;
  left?: number;
  width?: number;
}> = ({ children, start, top, left = 100, width = 570 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [start, start + 8], [0, 1], {
    ...clamp,
    easing: ease,
  });

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width,
        color: BLACK,
        fontFamily: FONT,
        fontSize: 34,
        fontWeight: 650,
        lineHeight: 1.15,
        opacity: p,
        transform: `translateY(${(1 - p) * 16}px)`,
      }}
    >
      {children}
    </div>
  );
};

const ChaosCard: React.FC<{
  label: string;
  body: string;
  x: number;
  y: number;
  delay: number;
  rotate: number;
}> = ({ label, body, x, y, delay, rotate }) => {
  const frame = useCurrentFrame();
  const p = pop(frame, delay);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 360,
        borderRadius: 28,
        padding: "20px 24px",
        background: SOFT,
        border: "2px solid rgba(233,76,42,.18)",
        boxShadow: "0 18px 45px rgba(17,16,15,.12)",
        fontFamily: FONT,
        opacity: interpolate(p, [0, 0.25], [0, 1], clamp),
        transform: `scale(${0.86 + p * 0.14}) rotate(${rotate}deg)`,
      }}
    >
      <div style={{ color: THEME, fontSize: 18, fontWeight: 900 }}>{label}</div>
      <div style={{ color: BLACK, fontSize: 32, fontWeight: 850, marginTop: 6 }}>
        {body}
      </div>
    </div>
  );
};

const ReactionBurst: React.FC<{ start: number; right?: number; top?: number }> = ({
  start,
  right = 168,
  top = 120,
}) => {
  const frame = useCurrentFrame();
  const items = ["live", "chat", "buy", "+23", "sold", "ask"];

  return (
    <>
      {items.map((item, i) => {
        const p = pop(frame, start + i * 4);
        return (
          <div
            key={item}
            style={{
              position: "absolute",
              right: right + (i % 2) * 92,
              top: top + i * 66,
              borderRadius: 999,
              padding: "14px 22px",
              background: i % 2 === 0 ? THEME : BLACK,
              color: "#fff",
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 900,
              opacity: interpolate(p, [0, 0.3], [0, 1], clamp),
              transform: `translateY(${(1 - p) * 26}px) scale(${0.8 + p * 0.2})`,
            }}
          >
            {item}
          </div>
        );
      })}
    </>
  );
};

const LogoLockup: React.FC = () => {
  const frame = useCurrentFrame();
  const p = pop(frame, 292);
  return (
    <AbsoluteFill
      style={{
        background: THEME,
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
      }}
    >
      <Img
        src={staticFile("logo.png")}
        style={{
          width: 300,
          height: 300,
          objectFit: "cover",
          transform: `scale(${0.72 + p * 0.28})`,
          borderRadius: 32,
        }}
      />
      <div
        style={{
          color: "#fff",
          fontSize: 58,
          fontWeight: 900,
          marginTop: 12,
          opacity: interpolate(frame, [306, 322], [0, 1], clamp),
        }}
      >
        Shopping that feels alive
      </div>
    </AbsoluteFill>
  );
};

export const MyComposition = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        background: "#fff",
        overflow: "hidden",
        fontFamily: FONT,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(233,76,42,.08), rgba(255,255,255,0) 42%), #fff",
        }}
      />

      <AbsoluteFill style={{ opacity: scene(frame, 0, 54) }}>
        <ChaosCard label="WhatsApp" body="Still available?" x={76} y={115} delay={2} rotate={-5} />
        <ChaosCard label="Instagram DM" body="Last price?" x={440} y={230} delay={7} rotate={4} />
        <ChaosCard label="Missed call" body="Who is this?" x={830} y={100} delay={12} rotate={-3} />
        <ChaosCard label="Buyer" body="Can I trust it?" x={690} y={390} delay={17} rotate={5} />
        <Headline start={12} top={690} size={76} width={980}>
          Campus buying is too messy
        </Headline>
        <Body start={20} top={790} width={760}>
          Too many chats, no clear proof, slow replies.
        </Body>
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: scene(frame, 46, 104) }}>
        <Headline start={48} top={86} size={86} width={820}>
          Meet Markt
        </Headline>
        <Body start={56} top={196} width={650}>
          A faster way to discover, chat, request, order, and buy from students around you.
        </Body>
        <PhoneShot img={4} x={820} y={80} scale={1.05} rotate={-5} delay={50} />
        <PhoneShot img={6} x={1100} y={180} scale={0.88} rotate={6} delay={60} />
        <ReactionBurst start={62} right={80} top={130} />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: scene(frame, 96, 158) }}>
        <Headline start={98} top={86} size={68} width={560}>
          Find what students are selling
        </Headline>
        <Body start={106} top={275} width={500}>
          Scroll products, spot prices fast, and jump into action before someone else buys it.
        </Body>
        <PhoneShot img={5} x={760} y={70} scale={1.1} rotate={2} delay={98} z={3} />
        <PhoneShot img={10} x={1055} y={120} scale={0.94} rotate={-7} delay={108} z={2} />
        <PhoneShot img={12} x={1300} y={185} scale={0.8} rotate={8} delay={116} z={1} />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: scene(frame, 148, 212) }}>
        <Headline start={150} top={80} size={74} width={620}>
          Ask. Chat. Close the deal.
        </Headline>
        <Body start={158} top={268} width={560}>
          Messages and buyer requests keep the conversation clear, direct, and inside Markt.
        </Body>
        <PhoneShot img={1} x={790} y={76} scale={1.1} rotate={-4} delay={150} />
        <PhoneShot img={2} x={1058} y={158} scale={0.9} rotate={6} delay={160} />
        <ReactionBurst start={170} right={72} top={164} />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: scene(frame, 202, 270) }}>
        <Headline start={204} top={90} size={72} width={650}>
          Request it. Order it. Pick it up.
        </Headline>
        <Body start={212} top={280} width={560}>
          Built around everyday campus commerce: gadgets, fashion, books, food, and quick student needs.
        </Body>
        <PhoneShot img={3} x={800} y={80} scale={1.05} rotate={5} delay={204} />
        <PhoneShot img={14} x={1080} y={104} scale={1.0} rotate={-5} delay={214} />
        <PhoneShot img={9} x={1340} y={190} scale={0.78} rotate={7} delay={224} />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: scene(frame, 260, 318) }}>
        <div
          style={{
            position: "absolute",
            left: 95,
            top: 86,
            color: THEME,
            fontSize: 92,
            fontWeight: 950,
            lineHeight: 0.95,
            width: 780,
          }}
        >
          Student commerce, but alive.
        </div>
        {["Live energy", "Real chats", "Campus trust", "Fast buying"].map((item, i) => {
          const p = pop(frame, 268 + i * 6);
          return (
            <div
              key={item}
              style={{
                position: "absolute",
                left: 105 + i * 335,
                bottom: 126,
                width: 270,
                height: 112,
                borderRadius: 34,
                background: i % 2 === 0 ? THEME : BLACK,
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 30,
                fontWeight: 900,
                opacity: interpolate(p, [0, 0.35], [0, 1], clamp),
                transform: `translateY(${(1 - p) * 36}px)`,
              }}
            >
              {item}
            </div>
          );
        })}
        <PhoneShot img={13} x={1035} y={30} scale={1.0} rotate={-8} delay={264} />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: interpolate(frame, [300, 314], [0, 1], clamp) }}>
        <LogoLockup />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
