import { env, isProd } from "@backend/configs/env.config"
import { Suprsend } from "@suprsend/node-sdk"

export const suprClient = isProd
	? new Suprsend(env.SUPRSEND_API_KEY as string, env.SUPRSEND_API_SECRET as string) 
	: null;