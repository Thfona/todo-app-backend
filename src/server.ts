import { app } from './app';
import { EnvironmentUtil } from './utils/environment.util';

const PORT = EnvironmentUtil.serverPort();

app.listen(PORT, () => {
  console.log(`Ready on http://localhost:${PORT}`);
});
