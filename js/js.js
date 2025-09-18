let cart = [];
        let cartCount = 0;
        let cartTotal = 0;

        // Función para agregar productos al carrito
        function addToCart(name, price) {
            const existingItem = cart.find(item => item.name === name);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    name: name,
                    price: price,
                    quantity: 1
                });
            }
            
            updateCartUI();
            
            // Animación de confirmación en el botón
            event.target.innerHTML = '✅ Agregado';
            event.target.style.background = 'linear-gradient(135deg, #25D366, #128C7E)';
            setTimeout(() => {
                event.target.innerHTML = '🛒 Agregar al Carrito';
                event.target.style.background = '';
            }, 1500);
        }

        // Función para remover productos del carrito
        function removeFromCart(name) {
            const itemIndex = cart.findIndex(item => item.name === name);
            if (itemIndex > -1) {
                cart.splice(itemIndex, 1);
                updateCartUI();
            }
        }

        // Función para actualizar cantidad de productos
        function updateQuantity(name, newQuantity) {
            const item = cart.find(item => item.name === name);
            if (item) {
                if (newQuantity <= 0) {
                    removeFromCart(name);
                } else {
                    item.quantity = newQuantity;
                    updateCartUI();
                }
            }
        }

        // Función para actualizar la interfaz del carrito
        function updateCartUI() {
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            document.querySelector('.cart-count').textContent = cartCount;
            document.getElementById('cartTotal').textContent = `Total: ${cartTotal.toLocaleString()}`;
            
            const cartItemsContainer = document.getElementById('cartItems');
            
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p style="text-align: center; color: #A0845C; margin-top: 2rem;">Tu carrito está vacío</p>';
            } else {
                cartItemsContainer.innerHTML = cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <div class="cart-item-name">${item.name}</div>
                            <div class="cart-item-price">${item.price.toLocaleString()} x ${item.quantity}</div>
                        </div>
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity('${item.name}', ${item.quantity + 1})">+</button>
                            <button class="remove-item" onclick="removeFromCart('${item.name}')">🗑️</button>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Función para abrir/cerrar el carrito
        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.querySelector('.cart-overlay');
            
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        }

        // Función para cerrar el carrito
        function closeCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.querySelector('.cart-overlay');
            
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        }

        // Función para finalizar compra por WhatsApp
        function checkout() {
            if (cart.length === 0) {
                alert('Tu carrito está vacío');
                return;
            }
            
            let message = '🛒 ¡Hola! Me gustaría hacer este pedido:\n\n';
            cart.forEach(item => {
                message += `• ${item.name}\n  Cantidad: ${item.quantity}\n  Subtotal: ${(item.price * item.quantity).toLocaleString()}\n\n`;
            });
            message += `💰 *Total: ${cartTotal.toLocaleString()}*\n\n¡Gracias! ☕`;
            
            const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }

        // Función para mensajes rápidos de WhatsApp
        function sendQuickMessage(type) {
            let message = '';
            
            switch(type) {
                case 'productos':
                    message = '¡Hola! Me gustaría conocer más detalles sobre sus productos de café para la piel 😊';
                    break;
                case 'asesoria':
                    message = '¡Hola! Necesito ayuda para elegir los productos ideales para mi tipo de piel 🌟';
                    break;
                case 'envios':
                    message = '¡Hola! Me gustaría conocer información sobre envíos y tiempos de entrega 📦';
                    break;
                case 'distribucion':
                    message = '¡Hola! Estoy interesado/a en ser distribuidor de productos Capucremoso 🤝';
                    break;
            }
            
            const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }

        // Navegación suave para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Efecto de scroll en el header
        window.addEventListener('scroll', function() {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'linear-gradient(135deg, rgba(245, 242, 237, 0.95) 0%, rgba(237, 231, 223, 0.95) 100%)';
                header.style.backdropFilter = 'blur(15px)';
            } else {
                header.style.background = 'linear-gradient(135deg, #F5F2ED 0%, #EDE7DF 100%)';
                header.style.backdropFilter = 'blur(10px)';
            }
        });

        // Animación de aparición para las tarjetas de productos
        window.addEventListener('load', function() {
            const cards = document.querySelectorAll('.product-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 150);
            });
        });
        function toggleMobileMenu() {
        const mobileNav = document.getElementById('mobileNav');
        const overlay = document.querySelector('.mobile-nav-overlay');
        mobileNav.classList.toggle('open');
        overlay.classList.toggle('active');
    }

    // Función para cerrar el menú móvil
    function closeMobileMenu() {
        const mobileNav = document.getElementById('mobileNav');
        const overlay = document.querySelector('.mobile-nav-overlay');
        mobileNav.classList.remove('open');
        overlay.classList.remove('active');
    }