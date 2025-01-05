import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Seamless Shopping Experience",
    Svg: require("@site/static/img/feature_card-1.svg").default,
    description: (
      <>
        Discover a user-friendly interface designed to make shopping enjoyable.
        Browse products effortlessly, enjoy intuitive navigation, and complete
        purchases with a streamlined checkout process.
      </>
    ),
  },
  {
    title: "Empowering Sellers to Succeed",
    Svg: require("@site/static/img/feature_card-2.svg").default,
    description: (
      <>
        Designed with sellers in mind, our platform offers tools to showcase
        your products, manage orders, and build a strong brand identity with
        customizable profiles.
      </>
    ),
  },
  {
    title: "Socialize Your Shopping",
    Svg: require("@site/static/img/feature_card-3.svg").default,
    description: (
      <>
        Blend the best of e-commerce with social media. Chat with others, share
        stories, and connect with sellers like never before to make your
        shopping experience interactive and fun.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
