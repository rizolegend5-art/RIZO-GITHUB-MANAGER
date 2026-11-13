export default ({config}) => ({...config, extra:{...config.extra, eas:{projectId:process.env.EXPO_PUBLIC_EAS_PROJECT_ID || 'REPLACE_WITH_EAS_PROJECT_ID'}}});
