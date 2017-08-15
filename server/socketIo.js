import * as Getter from './getters/getUsers.js';
import * as ChatUpdater from './updaters/updateChats.js';

const socket = (users) => (socket) => {

  const loggedUser = socket.decoded_token.login;
  // console.log('a user connected', socket.id);
  users.push({ login: loggedUser, socketId: socket.id });

// Disconnect : when the user is logging out, suppressing corresponding socket ids from users array.
// All sockets of one user are cleared (if user has several connections going on)
  socket.on('disconnect', () => {
    // console.log('user disconnected', socket.id);
    let index = users.findIndex(user => (user.login === loggedUser));
    while (index !== -1) {
      users.splice(index, 1);
      index = users.findIndex(user => (user.login === loggedUser));
    }
  });

// Chat message : when a user is chatting another user, send message to user chatted
// (see Messages.js client-side for emit)
  socket.on('chat message', ({ toUser, fromUser, message }) => {
    users.forEach((user) => {
      const { login, socketId } = user;
      if (login === toUser) {
        socket.to(socketId).emit('chat message', { toUser, fromUser, message });
      }
    })
    socket.emit('chat message', { toUser, fromUser, message });
  });

// Chat count : when a user is chatting another user, add number of unread messages to user chatted
// Add in db if user is not connected. If connected, check front-side that the user chatted is not on this specific chat page.
// (see Messages.js client-side for emit)
  socket.on('chat count', async ({ toUser, fromUser }) => {
    if (toUser !== fromUser) {
      const profileToUser = await Getter.getUser({ field: 'login', value: toUser });
      const profileFromUser = await Getter.getUser({ field: 'login', value: fromUser });
      if (!profileToUser.blockes.includes(fromUser) && !profileFromUser.blockes.includes(toUser)) {
        users.forEach((user) => {
          const { login, socketId } = user;
          if (login === toUser) {
            socket.to(socketId).emit('chat count', { toUser, fromUser });
          }
        })
      }
      const indexUser = users.findIndex(user => user.login === toUser);
      if (indexUser === -1) {
        ChatUpdater.increaseNewMessages({ toUser, fromUser });
      }
    }
  });

// Visit : when a user (loggedUser) is visiting another user (loginSearch), send notification to user visited
// (see Header.js client-side for emit)
  socket.on('visit', async (loginSearch) => {
    const profileSearch = await Getter.getUser({ field: 'login', value: loginSearch });
    const profileLogged = await Getter.getUser({ field: 'login', value: loggedUser });
    const blockes = profileSearch.blockes.concat(profileLogged.blockes);
    if (loginSearch !== loggedUser && !blockes.includes(loggedUser) && !blockes.includes(loginSearch)) {
      // console.log('Je suis', loggedUser, 'je cherche', loginSearch);
      users.forEach((user) => {
        const { login, socketId } = user;
        if (login === loginSearch) {
          // console.log('Envoi à', socketId, login, 'visite de', loggedUser);
          socket.to(socketId).emit('visit', loggedUser);
        }
      })
    }
  });

// Like / Dislike : when a user (loggedUser) likes / dislikes another user (loginSearch), send notification to user liked / disliked
// If the like is reciprocated, it's a match!
// (see OneProfile-Like.js client-side for emit)
  socket.on('like', async (loginSearch) => {
    const profile = await Getter.getUser({ field: 'login', value: loggedUser });
    const { likedBy } = profile;
    const logins = likedBy.map(elem => (elem.login));
    if (loginSearch !== loggedUser) {
      if (logins.includes(loginSearch) === false) {
        users.forEach((user) => {
          const { login, socketId } = user;
          if (login === loginSearch) {
            socket.to(socketId).emit('like', loggedUser);
          }
        })
      } else {
        users.forEach((user) => {
          const { login, socketId } = user;
          if (login === loginSearch) {
            socket.to(socketId).emit('match', loggedUser);
          }
        })
      }
    }
  });

  socket.on('dislike', (loginSearch) => {
    if (loginSearch !== loggedUser) {
      users.forEach((user) => {
        const { login, socketId } = user;
        if (login === loginSearch) {
          socket.to(socketId).emit('dislike', loggedUser);
        }
      })
    }
  });

}

export default socket;
