import { Args } from "./prompt/Args";
import TemplateConfig from "./TemplateConfig";

export default interface CliOptions {
  templatePath: string;
  targetPath: string;
  config: TemplateConfig;
  args: Args;
}
