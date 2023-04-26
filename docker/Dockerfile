FROM node:16    
WORKDIR /app
# install vite globally
RUN npm install -g vite
# copy all filtes
COPY . .    
# install all deps
RUN yarn install

# vite default port
EXPOSE 8081    
CMD ["yarn", "run", "dev"]